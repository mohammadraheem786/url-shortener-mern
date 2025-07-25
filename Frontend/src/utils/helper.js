import { redirect } from "@tanstack/react-router";
import { login } from "../store/slice/auth.Slice";
import { getCurrentUser } from "../apis/user.api";

export const checkAuth = async ({ context }) => {
  try {
    console.log(context);
    const { queryClient, store } = context;

    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });

    if (!user) return false;

    store.dispatch(login(user));

    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) return false;

    return true;
  } catch (error) {
    console.log(error);
    return redirect({ to: "/auth/signup" });
  }
};
