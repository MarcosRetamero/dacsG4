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
}
