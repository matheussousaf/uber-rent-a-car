package uberrentacar.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uberrentacar.api.models.Vehicle;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByAvailableIsTrue();

    Vehicle findVehicleById(Long id);

}
