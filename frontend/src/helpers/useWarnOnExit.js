import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useWarnOnExit = (shouldWarn) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (shouldWarn) {
        event.preventDefault();
        event.returnValue = "Tienes cambios sin guardar. ¿Seguro que quieres salir?";
      }
    };

    const handleNavigation = (event) => {
      if (shouldWarn) {
        const confirmLeave = window.confirm("Tienes cambios sin guardar. ¿Seguro que quieres salir?");
        if (!confirmLeave) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [shouldWarn, navigate, location]);
};

export default useWarnOnExit;
