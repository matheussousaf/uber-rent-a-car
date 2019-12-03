package uberrentacar.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uberrentacar.api.models.Car;

public interface CarRepository extends JpaRepository<Car, Long> {

}
