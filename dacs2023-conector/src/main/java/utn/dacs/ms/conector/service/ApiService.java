package utn.dacs.ms.conector.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.dacs.ms.conector.api.client.ApiClient;
import utn.dacs.ms.conector.dto.ItemDto;

@Service
public class ApiService {
    
    @Autowired
    private ApiClient apiClient;
    
    /*
    public List<ItemDto> todos() {
        return apiClient.todos();
    }
    */
} 