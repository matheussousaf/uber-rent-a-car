package uberrentacar.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import uberrentacar.api.models.Customer;
import uberrentacar.api.models.Motorcycle;
import uberrentacar.api.repositories.CustomerRepository;
import uberrentacar.api.repositories.MotorcycleRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/motorcycles")
@CrossOrigin
public class MotorcycleController {

    @Autowired
    MotorcycleRepository motorcycleRepository;

    @Autowired
    CustomerRepository customerRepository;

    /**
     * Method for getting ONLY all registered motorcycles.
     * */
    @GetMapping(value = "/list_all_motorcycles")
    public List<Motorcycle> listMotorcycles(){
        return motorcycleRepository.findAll();
    }


    /**
     * Method for registering a new motorcycle in the database.
     * @param motorcycleToBeAdded The motorcycle to be registered in the database.
     * */
    @PostMapping(value = "/add_new_motorcycle")
    public Motorcycle addNewMotorcycle(@RequestBody Motorcycle motorcycleToBeAdded, @RequestParam String customerCpf ){

        Customer customer = customerRepository.findCustomerByCpf(customerCpf);
        customer.setOwnedVehicle(motorcycleToBeAdded);

        return motorcycleRepository.save( motorcycleToBeAdded );
    }
}
