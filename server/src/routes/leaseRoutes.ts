import express from "express";
import { getLeasePayments, getLeases, getLeasesByPropertyId } from "../controllers/leaseControllers";
import { authMiddleware } from "../middleware/authMiddleware";


const router = express.Router();
router.get("/", authMiddleware(["manager", "tenant"]), getLeases)

router.get(
  "/property/:propertyId",
  authMiddleware(["manager", "tenant"]),
  getLeasesByPropertyId
);
router.get("/:id/payments", authMiddleware(["manager", "tenant"]), getLeasePayments)


export default router;