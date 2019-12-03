package uberrentacar.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import uberrentacar.api.models.Car;
import uberrentacar.api.models.Customer;
import uberrentacar.api.repositories.CarRepository;
import uberrentacar.api.repositories.CustomerRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/cars")
@CrossOrigin
public class CarController {

    @Autowired
    CarRepository carRepository;

    @Autowired
    CustomerRepository customerRepository;

    /**
     * Method for getting ONLY all registered cars.
     * */
    @GetMapping(value = "/list_all_cars")
    public List<Car> listCars(){
        return carRepository.findAll();
    }

    /**
     * Method for registering a new car in the database.
     * @param carToBeAdded The car to be registered in the database.
     * */
    @PostMapping(value = "/add_new_car")
    public Car addNewCar(@RequestBody Car carToBeAdded, @RequestParam String customerCpf){

        Customer customer = customerRepository.findCustomerByCpf(customerCpf);
        customer.setOwnedVehicle(carToBeAdded);

        return carRepository.save(carToBeAdded);
    }

}
