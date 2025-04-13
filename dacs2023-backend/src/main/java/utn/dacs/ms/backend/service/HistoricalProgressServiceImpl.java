package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.dacs.ms.backend.model.entity.HistoricalProgress;
import utn.dacs.ms.backend.model.repository.HistoricalProgressRepository;

@Service
public class HistoricalProgressServiceImpl implements HistoricalProgressService {

    @Autowired
    private HistoricalProgressRepository historicalProgressRepository;

    @Override
    public Optional<HistoricalProgress> getById(Long id) {
        return historicalProgressRepository.findById(id);
    }

    @Override
    public List<HistoricalProgress> getAll() {
        return historicalProgressRepository.findAll();
    }

    @Override
    public HistoricalProgress save(HistoricalProgress entity) {
        return historicalProgressRepository.save(entity);
    }

    @Override
    public void delete(Long id) {
        Optional<HistoricalProgress> historicalProgress = getById(id);
        historicalProgress.ifPresent(historicalProgressRepository::delete);
    }

    @Override
    public Boolean existById(Long id) {
        return historicalProgressRepository.existsById(id);
    }

    @Override
    public List<HistoricalProgress> find(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }

    @Override
    public HistoricalProgress getBy(Map<String, Object> filter) {
        throw new UnsupportedOperationException("No implementado");
    }
    
    public List<HistoricalProgress> getByCustomerId(String customerid) {
        return historicalProgressRepository.findByCustomerid(customerid);
    }
    
    @Override
    public HistoricalProgress updateLastByCustomerId(String customerId, HistoricalProgress updatedData) {
        List<HistoricalProgress> progressList = historicalProgressRepository.findByCustomerid(customerId);
        if (progressList.isEmpty()) {
            throw new RuntimeException("No historical progress found for customerId: " + customerId);
        }

        HistoricalProgress latest = progressList.stream()
            .max((a, b) -> a.getDate().compareTo(b.getDate()))
            .orElseThrow(() -> new RuntimeException("Unable to determine latest progress"));

        // Actualizamos los datos necesarios
        latest.setWeight(updatedData.getWeight());
        latest.setDate(updatedData.getDate());

        return historicalProgressRepository.save(latest);
    }

}
