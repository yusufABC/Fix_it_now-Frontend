import { useActionState, useEffect } from "react";
import { cencelBookingAction } from "../_actions/cancelBookingAction";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HandleCancelButton = ({ bookingId }: { bookingId: string }) => {
    const [state,action,pending]=useActionState(cencelBookingAction,null)
      useEffect(()=>{
        if(!state) return
        
        if (!state.success) {
            toast.error(state.message || "Failed to start checkout");
        }
  },[state])
    return (
        <div>
             {/* {(booking.status === "REQUESTED" || booking.status === "ACCEPTED") && (
        )} */}
        
   <form action={action}>
                  {/* Hidden input to pass the booking ID into formData */}
      <input type="hidden" name="bookingId" value={bookingId} />

            <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Cancelling...." : "Cancel"}
            </Button>
        </form>
        </div>
    );
};

export default HandleCancelButton;