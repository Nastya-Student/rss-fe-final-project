import { supabase } from "./supabase";
import { getCurrentUserId } from "./user.service";

export const subscribeToUser = (onChange: () => void) => {
  const channel = supabase
    .channel("user-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "profiles",
      },
      () => {
        onChange();
      },
    )
    .subscribe();

  onChange();

  return () => {
    void supabase.removeChannel(channel);
  };
};

export const subscribeToSessions = (onChange: () => void) => {
  const channel = supabase
    .channel("sessions-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "practice_sessions",
      },
      () => {
        onChange();
      },
    )
    .subscribe();

  onChange();

  return () => {
    void supabase.removeChannel(channel);
  };
};

export const subscribeToProgress = (onChange: () => void) => {
  const channel = supabase
    .channel("progress-changes")

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "completed_widgets",
      },
      onChange,
    )

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "progress",
      },
      onChange,
    )

    .subscribe();

  onChange();

  return () => {
    void supabase.removeChannel(channel);
  };
};

export const subscribeToAuthChange = (onChange: () => void) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(() => {
    onChange();
  });

  return () => {
    subscription.unsubscribe();
  };
};

export const subscribeToProfile = async (onChange: () => void) => {
  const userId = await getCurrentUserId();
  if (userId === null || userId === undefined || userId === "") {
    throw new Error("Not authenticated");
  }

  const channel = supabase
    .channel("profile-realtime")

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "profiles",
        filter: `id=eq.${userId}`,
      },
      onChange,
    )

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "completed_widgets",
        filter: `user_id=eq.${userId}`,
      },
      onChange,
    )

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "progress",
        filter: `user_id=eq.${userId}`,
      },
      onChange,
    )

    .subscribe();

  onChange();

  return () => {
    void supabase.removeChannel(channel);
  };
};
