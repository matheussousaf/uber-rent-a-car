package uberrentacar.api.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter @Setter
@Table(name = "motorcycles")
public class Motorcycle extends Vehicle {

    @Column(name = "has_eletric_start")
    protected boolean hasElectricStart;

}
