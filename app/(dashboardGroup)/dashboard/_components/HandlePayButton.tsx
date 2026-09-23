import { useActionState, useEffect } from "react";
import { payBookingAction } from "../_actions/payBookingAction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function HandlePayButton ({ bookingId }: { bookingId: string }) {

      const [state,action,pending]=useActionState(payBookingAction,null)
    //   console.log("action",action);
  useEffect(()=>{
        if(!state) return
        
        if (!state.success) {
            toast.error(state.message || "Failed to start checkout");
        }
  },[state])
  

    return (
        <form action={action}>
                  {/* Hidden input to pass the booking ID into formData */}
      <input type="hidden" name="bookingId" value={bookingId} />

            <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Redirecting..." : "💳 Pay with Stripe"}
            </Button>
        </form>
    )
  };