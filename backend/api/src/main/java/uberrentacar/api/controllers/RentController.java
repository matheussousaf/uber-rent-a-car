package uberrentacar.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import uberrentacar.api.models.*;
import uberrentacar.api.repositories.CustomerRepository;
import uberrentacar.api.repositories.RentRepository;
import uberrentacar.api.repositories.VehicleRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/rents")
@CrossOrigin
public class RentController {

    @Autowired
    RentRepository rentRepository;

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    CustomerRepository customerRepository;


    /**
     * Method for getting all rents.
     * */
    @GetMapping(value = "/list_all_rents")
    public List<Rent> listRents(){ return rentRepository.findAll(); }

    /**
     * Method for registering a new rent in the database.
     * @param rentToBeAdded The rent to be registered in the database.
     * */
    @PostMapping(value = "/add_new_rent")
    public Rent addNewRent(@RequestBody Rent rentToBeAdded, @RequestParam("vehicleId") Long rentedVehicleId, @RequestParam("customerCpf") String customerCpf ) {

        // Managing current customer state.
        Customer customer = customerRepository.findCustomerByCpf(customerCpf);
        customer.setRentStatus(StatusOfCustomerRent.RENTING);
        rentToBeAdded.setCustomer(customer);

        // Managing vehicle availability and current state.
        Vehicle vehicle = vehicleRepository.findVehicleById(rentedVehicleId);
        vehicle.setAvailable(false);
        vehicle.setCurrentRent(rentToBeAdded);
        rentToBeAdded.setRentedVehicle(vehicle);

        // Adding Discount.
        double priceOfDayOfRent = vehicle.getRentValuePerDay();
        rentToBeAdded.setPriceOfDayOfRent(priceOfDayOfRent);

        int discount = 0;
        if(priceOfDayOfRent > 0 && priceOfDayOfRent <= 25){
            discount = 2;
        } else if (priceOfDayOfRent > 25 && priceOfDayOfRent <= 50){
            discount = 5;
        } else if (priceOfDayOfRent > 50 && priceOfDayOfRent <= 75){
            discount = 8;
        } else{
            discount = 12;
        }
        rentToBeAdded.setDiscountPercentage(discount);

        // Adding Insurance.
        double insuranceValue = 0.0;
        if(rentToBeAdded.isHasInsurance()){
            try{
                Car ifVehicleIsCar = (Car) vehicle;
                int numberOfSeats = ifVehicleIsCar.getNumberOfSeats();
                System.out.println("Number of seats: " + numberOfSeats);
                insuranceValue = 0.05 * ifVehicleIsCar.getRentValuePerDay() * ( 1 + (double) numberOfSeats/20);
            } catch(Exception e){
                insuranceValue = 0.09 * vehicle.getRentValuePerDay();
            }
        }
        rentToBeAdded.setInsuranceValue(insuranceValue);

        // Adding Total Price.
        int totalDaysOfRent = rentToBeAdded.getTotalDaysOfRent();
        double totalPrice = (totalDaysOfRent * priceOfDayOfRent) * (1 - (double) discount/100);
        rentToBeAdded.setTotalPrice(totalPrice + insuranceValue);


        return rentRepository.save( rentToBeAdded );
    }
}
