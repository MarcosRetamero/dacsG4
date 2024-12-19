package utn.dacs.ms.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import utn.dacs.ms.backend.dto.HistoricalProgressDto;
import utn.dacs.ms.backend.exceptions.ResourceNotFoundException;
import utn.dacs.ms.backend.model.entity.HistoricalProgress;
import utn.dacs.ms.backend.service.HistoricalProgressService;

@RestController
@RequestMapping(value = "/historical-progress")
public class HistoricalProgressController {

    @Autowired
    private HistoricalProgressService historicalProgressService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("")
    public ResponseEntity<List<HistoricalProgressDto>> getAll() {
        List<HistoricalProgress> progressList = historicalProgressService.getAll();
        List<HistoricalProgressDto> data = progressList.stream()
                                                        .map(progress -> modelMapper.map(progress, HistoricalProgressDto.class))
                                                        .collect(Collectors.toList());
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoricalProgressDto> getById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Optional<HistoricalProgress> progress = historicalProgressService.getById(id);
        if (progress.isEmpty()) {
            throw new ResourceNotFoundException("HistoricalProgress not found");
        }
        HistoricalProgressDto data = modelMapper.map(progress.get(), HistoricalProgressDto.class);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<HistoricalProgressDto> create(@RequestBody HistoricalProgressDto progressDto) {
        HistoricalProgress progress = modelMapper.map(progressDto, HistoricalProgress.class);
        HistoricalProgressDto data = modelMapper.map(historicalProgressService.save(progress), HistoricalProgressDto.class);
        return new ResponseEntity<>(data, HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<HistoricalProgressDto> update(@RequestBody HistoricalProgressDto progressDto) throws ResourceNotFoundException {
        if (progressDto.getId() == null || !historicalProgressService.existById(progressDto.getId())) {
            throw new ResourceNotFoundException("HistoricalProgress not found");
        }

        HistoricalProgress progress = modelMapper.map(progressDto, HistoricalProgress.class);
        HistoricalProgressDto data = modelMapper.map(historicalProgressService.save(progress), HistoricalProgressDto.class);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        if (id == null || !historicalProgressService.existById(id)) {
            throw new ResourceNotFoundException("HistoricalProgress not found");
        }

        historicalProgressService.delete(id);
        return new ResponseEntity<>("HistoricalProgress deleted", HttpStatus.OK);
    }
}
