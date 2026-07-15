import { useMutation } from "@tanstack/react-query";
import { API } from "../Api/boardPageApi";
import type { LoginPayload, RegisterPayload } from "../Type";
import { useBoardStore } from "../store/boardStore";
import { useNavigate } from "react-router-dom";

export function useLoginMutation() {
    const navigate = useNavigate();
    const profile  = useBoardStore((state) => state.setProfile);
    return useMutation({
        mutationFn: (loginData : LoginPayload) => API.login(loginData),
        onSuccess: (data) => {
            profile(data.user);
            navigate("/boards", { replace: true });
        }
    });
}

export function useRegisterMutation() {
    const navigate = useNavigate();
    const profile  = useBoardStore((state) => state.setProfile);
    return useMutation({
        mutationFn: (registerData: RegisterPayload) => API.register(registerData),
        onSuccess: (data) => {
            profile(data.user);
            navigate("/boards", { replace: true });
        }
    });
}
