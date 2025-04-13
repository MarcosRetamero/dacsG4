package utn.dacs.ms.backend.dto;

import java.time.LocalDate;

public class HistoricalProgressDto {

    private Long id;
    private String customerid;
    private LocalDate date;
    private Double weight;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerid;
    }

    public void setCustomerId(String customerId) {
        this.customerid = customerId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

}
