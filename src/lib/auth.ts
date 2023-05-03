import { SignInFormData, SignUpFormData } from "@/types/types";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";
export const useSignUpClerk = () => {
  const { signUp, setActive } = useSignUp();
  const mutate = async (url: string, { arg }: { arg: SignUpFormData }) => {
    return await signUp!
      .create({
        emailAddress: arg.email,
        password: arg.password,
        username: arg.username,
        redirectUrl: "/",
      })
      .then((response) => {
        if (response.status === "complete") {
          console.log(response);
          setActive?.({ session: response.createdSessionId });
        }
      })
      .catch((error) => {
        throw new Error(error.errors[0].message);
      });
  };
  return useSWRMutation("signup", mutate);
};

export const useSignInClerk = () => {
  const { signIn, setActive } = useSignIn();
  const mutate = async (url: string, { arg }: { arg: SignInFormData }) => {
    return await signIn!
      .create({
        identifier: arg.identifier,
        password: arg.password,
        redirectUrl: "/",
      })
      .then((response) => {
        if (response.status === "complete") {
          setActive?.({ session: response.createdSessionId });
        }
      })
      .catch((error) => {
        throw new Error(error.errors[0].message);
      });
  };
  return useSWRMutation("signin", mutate);
};
