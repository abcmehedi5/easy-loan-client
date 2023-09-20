import React, { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`https://easy-loan-server-abcmehedi5.vercel.app/users/admin?email=${user?.email}`);
      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
