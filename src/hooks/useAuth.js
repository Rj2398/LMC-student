import { useState } from "react";
import { useDispatch } from "react-redux";

export default useAuth = () => {
  const dispatch = useDispatch();
  const [manualLoading, setManualLoading] = useState(false);

  const { mutateAsync: registerUser } = useMutation({
    mutationKey: ["signup_phone_number", "user"],
    mutationFn: async (payload) => {
      try {
        setManualLoading(true);
        const response = await api.post("signup_phone_number", payload);
        const { data } = response;
        if (data?.data) {
          setTimeout(() => {
            dispatch(setUserInfo(data?.data));
          }, 1000);
        }

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred";
        toast.error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  const isLoading = manualLoading;
  return {
    registerUser,
    manualLoading,
  };
};
