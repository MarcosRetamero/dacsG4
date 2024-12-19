package utn.dacs.ms.bff.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

public class Utils {
    
	private Utils() {
		super();
	}

	public static boolean isNullOrEmptyStr(String str) {
		return (str == null || str.isEmpty() || str.isBlank());
	}
	
    /**
     * @return keycloak_id (sub) del usuario obtenido desde el token de acceso.
     */
    public static String extractKeycloakId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((Jwt) authentication.getPrincipal()).getClaimAsString("sub");
    }

    /**
     * @return email del usuario obtenido desde el token de acceso.
     */
    public static String extractEmailFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((Jwt) authentication.getPrincipal()).getClaimAsString("email");
    }

    /**
     * @return username del usuario obtenido desde el token de acceso.
     */
    public static String extractUsernameFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((Jwt) authentication.getPrincipal()).getClaimAsString("preferred_username");
    }
}
