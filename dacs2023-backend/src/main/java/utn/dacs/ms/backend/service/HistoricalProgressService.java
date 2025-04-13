package utn.dacs.ms.backend.service;

import java.util.List;

import utn.dacs.ms.backend.model.entity.HistoricalProgress;

public interface HistoricalProgressService extends CommonService<HistoricalProgress> {

	List<HistoricalProgress> getByCustomerId(String customerid);
	
	HistoricalProgress updateLastByCustomerId(String customerId, HistoricalProgress updatedData);

}
