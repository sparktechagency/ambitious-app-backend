import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import stripe from '../config/stripe';
import ApiError from '../errors/ApiErrors';
import { Transaction } from '../app/modules/transaction/transaction.model';

export const handleCheckoutSession = async (data: Stripe.Checkout.Session) => {

    // Retrieve the subscription from Stripe
    const session = await stripe.checkout.sessions.retrieve(data?.id);

    const transaction:any = await Transaction.findOne({ sessionId: session.id }).populate("seller");
    if (!transaction) {
        return "Transaction not found.";
    }

    const transfer = await stripe.paymentIntents.create({
        amount: Number(transaction.price) * 100,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
        application_fee_amount: Number(transaction.price) * 0.1,
        transfer_data: {
            destination: transaction?.seller?.accountInformation?.stripeAccountId as string,
        },
        on_behalf_of: transaction?.seller?.accountInformation?.stripeAccountId as string
    });

    if(!transfer){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create transfer");
    }

    await Transaction.findOneAndUpdate(
        { sessionId: session.id },
        { paymentStatus: "Paid" },
        { new: true }
    );
}