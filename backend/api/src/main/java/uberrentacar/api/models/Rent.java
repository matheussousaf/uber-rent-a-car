package uberrentacar.api.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

@Entity
@Getter @Setter
@Table(name = "rents")
public class Rent {

    public Rent() {
        Calendar calendar = Calendar.getInstance();
        this.dateOfRent = (calendar.get(Calendar.DAY_OF_MONTH) + "/" + calendar.get(Calendar.MONTH) + "/" + calendar.get(Calendar.YEAR));
    }

    @Id
    @Column(name = "rent_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "rented_vehicle_id")
    @JsonManagedReference(value = "rented-vehicle")
    private Vehicle rentedVehicle;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    @JsonManagedReference(value = "current-rent")
    private Customer customer;

    @Column(name = "days_of_rent", nullable = false)
    private int totalDaysOfRent;

    @Column(name = "rent_date", nullable = false)
    private String dateOfRent;

    @Column(name = "has_insurance", nullable = false)
    private boolean hasInsurance;

    @Column(name = "insurance_value", columnDefinition = ("bigint default 0"))
    private double insuranceValue;

    @Column(name = "price_per_day")
    private double priceOfDayOfRent;

    @Column(name = "discount_percentage")
    private int discountPercentage;

    @Column(name = "total_price")
    private double totalPrice;
}
