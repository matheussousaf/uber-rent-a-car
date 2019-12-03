package uberrentacar.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import uberrentacar.api.models.Vehicle;
import uberrentacar.api.repositories.VehicleRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/vehicles")
@CrossOrigin
public class VehicleController {

    @Autowired
    VehicleRepository vehicleRepository;

    /**
     * Method for getting all registered vehicles (cars and motorcycles)
     * */
    @GetMapping(value = "/list_all_vehicles")
    public List<Vehicle> listVehicles(){
        return vehicleRepository.findAll();
    }

    @GetMapping(value = "/list_available_vehicles")
    public List<Vehicle> listVehiclesAvailable(){ return vehicleRepository.findByAvailableIsTrue(); }

}
