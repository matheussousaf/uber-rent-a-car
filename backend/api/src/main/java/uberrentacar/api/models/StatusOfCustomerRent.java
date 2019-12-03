package uberrentacar.api.models;

public enum StatusOfCustomerRent {
    RENTING("renting"),
    NO_RENT("no_rent");

    private final String status;

    StatusOfCustomerRent(String statusOfCustomerRent){
        this.status = statusOfCustomerRent;
    }

    /**
     * Get the current customer status;
     * */
    public String getStatus(){
        return status;
    }
}
