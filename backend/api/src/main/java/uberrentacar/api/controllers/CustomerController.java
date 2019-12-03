package uberrentacar.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import uberrentacar.api.models.Customer;
import uberrentacar.api.repositories.CustomerRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/customers")
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    /**
     * Method for getting all registered customers.
     * */
    @GetMapping(value = "/list_all_customers")
    public List<Customer> listCustomers() { return customerRepository.findAll(); }


    /**
     * Method for registering a new customer in the database.
     * @param customerToBeAdded The customer to be registered in the database.
     * */
    @PostMapping(value = "/add_new_customer")
    public Customer addCustomer(@RequestBody Customer customerToBeAdded) {
        return customerRepository.save( customerToBeAdded );
    }
}
