package uberrentacar.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uberrentacar.api.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {

    Customer findCustomerByCpf(String cpf);
}
