package uberrentacar.api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter @Setter
public class Vehicle {

    public Vehicle() {
    }

    @OneToOne(mappedBy = "ownedVehicle")
    @JsonBackReference(value="owned-vehicle")
    private Customer owner;

    @OneToOne(mappedBy = "rentedVehicle")
    @JsonBackReference(value = "rented-vehicle")
    private Rent currentRent;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_id", nullable = false, unique = true)
    private Long id;

    @Column(name = "model_name", nullable = false)
    private String modelName;

    @Column(name = "rent_value_per_day", nullable = false)
    private double rentValuePerDay;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "license_plate", nullable = false, unique = true)
    private String licensePlate;

    @Column(name = "color", nullable = false)
    private String vehicleColor;

    @Column(name = "is_available", nullable = false)
    private boolean available = true;
}
