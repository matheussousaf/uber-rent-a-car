package uberrentacar.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uberrentacar.api.models.Rent;

public interface RentRepository extends JpaRepository<Rent, Long> {
    
}
