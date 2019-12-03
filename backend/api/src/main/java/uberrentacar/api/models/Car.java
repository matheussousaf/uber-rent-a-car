package uberrentacar.api.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter @Setter
@Table(name = "cars")
public class Car extends Vehicle {

    @Column(name = "number_of_seats")
    protected int numberOfSeats;

}
