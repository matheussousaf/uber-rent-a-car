package uberrentacar.api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


/**
* Current status of the Customer related to the rents.
* @ RENTING is applied when the customer already rented a car.
* @ HAS_PENDING_RENT is applied when the customer sends a rent offer.
* @ NO_RENT is applied when the customer has no current rent. [default]
* */

@Entity
@Getter @Setter
@Table(name = "customers")
public class Customer {

    @OneToOne
    @JsonManagedReference(value = "owned-vehicle")
    @JoinColumn(name = "owned_vehicle")
    private Vehicle ownedVehicle;

    @OneToOne(mappedBy = "customer")
    @JsonBackReference(value = "current-rent")
    private Rent currentRent;

    @Id
    @Column(name = "cpf", nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "rent_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusOfCustomerRent rentStatus = StatusOfCustomerRent.NO_RENT;
}
