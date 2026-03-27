import {
  subscribeToAuthChange,
  subscribeToProgress,
  subscribeToSessions,
  subscribeToUser,
} from "./realtime.service";
import { supabase } from "./supabase";

import { getMyProfile } from "./user.service";
import { getMyPracticeSessions } from "./practice-session.service";
import { getTopicProgressList } from "./progress.service";

import type { User } from "../interfaces/user.interface";
import type { PracticeSession } from "../interfaces/practice-session.interface";
import type { TopicProgress } from "../interfaces/topic-progress.interface";

import topics from "../data/mock-topics.data.json";

type Listener = () => void;

type State = {
  user: User | undefined;
  sessions: PracticeSession[];
  progress: TopicProgress[];
};

class AppStateService {
  private listeners: Set<Listener> = new Set();
  private unsubscribeFns: (() => void)[] = [];

  private initialized = false;
  private timeout: number | undefined;
  private loading = false;

  state: State = {
    user: undefined,
    sessions: [],
    progress: [],
  };

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private setState(partial: Partial<State>) {
    let changed = false;

    for (const key in partial) {
      const typedKey = key as keyof State;

      if (this.state[typedKey] !== partial[typedKey]) {
        this.state[typedKey] = partial[typedKey] as never;
        changed = true;
      }
    }

    if (changed) {
      this.notify();
    }
  }

  private scheduleUpdate() {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
    }

    this.timeout = window.setTimeout(() => {
      void this.loadAll();
    }, 150);
  }

  private trigger = () => {
    this.scheduleUpdate();
  };

  private async loadAll() {
    if (this.loading) return;
    this.loading = true;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        this.setState({
          user: undefined,
          sessions: [],
          progress: [],
        });
        return;
      }

      const [user, sessions, progress] = await Promise.all([
        getMyProfile(),
        getMyPracticeSessions(topics),
        getTopicProgressList(topics),
      ]);

      this.setState({
        user,
        sessions,
        progress,
      });
    } catch {
    } finally {
      this.loading = false;
    }
  }

  async init() {
    if (this.initialized) return;
    this.initialized = true;

    await this.loadAll();

    const unsubAuth = subscribeToAuthChange(() => {
      this.setState({
        user: undefined,
        sessions: [],
        progress: [],
      });

      this.scheduleUpdate();
    });

    const unsubUser = subscribeToUser(this.trigger);
    const unsubSessions = subscribeToSessions(this.trigger);
    const unsubProgress = subscribeToProgress(this.trigger);

    this.unsubscribeFns.push(
      unsubAuth,
      unsubUser,
      unsubSessions,
      unsubProgress,
    );
  }

  destroy() {
    for (const fn of this.unsubscribeFns) {
      fn();
    }

    this.unsubscribeFns = [];

    this.listeners.clear();
    this.initialized = false;

    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
    }

    this.setState({
      user: undefined,
      sessions: [],
      progress: [],
    });
  }
}

export const appStateService = new AppStateService();
