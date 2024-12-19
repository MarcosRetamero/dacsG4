package utn.dacs.ms.bff.dto;

import java.util.UUID;

public class KeycloakUserDto {
	
	private UUID keycloakId;
    private String email;
    private Boolean state = true;	
	private Long id;
	
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public UUID getKeycloakId() {
		return keycloakId;
	}
	public void setKeycloakId(UUID keycloakId) {
		this.keycloakId = keycloakId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Boolean getState() {
		return state;
	}
	public void setState(Boolean state) {
		this.state = state;
	}

}