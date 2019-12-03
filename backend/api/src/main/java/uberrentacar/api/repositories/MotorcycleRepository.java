package uberrentacar.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uberrentacar.api.models.Motorcycle;

public interface MotorcycleRepository extends JpaRepository<Motorcycle, Long> {

}
