import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { User } from "@prisma/client";
import {
  CreateAddressRequest,
  DeleteAddressRequest,
  GetAddressRequest,
  ListAddressRequest,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressService } from "../service/address-service";

export const addressController = new Hono<{
  Variables: ApplicationVariables;
}>();

addressController.use(authMiddleware);

addressController.post("/api/contact/:id/addresses", async (c) => {
  const user = c.get("user") as User;
  const contact_id = Number(c.req.param("id"));
  const request = (await c.req.json()) as CreateAddressRequest;
  request.contact_id = contact_id;

  const response = await AddressService.create(user, request);

  return c.json({
    data: response,
  });
});

addressController.get("/api/contact/:contact_id/addresses/:id", async (c) => {
  const user = c.get("user") as User;
  const contact_id = Number(c.req.param("contact_id"));
  const id = Number(c.req.param("id"));
  const request: GetAddressRequest = {
    contact_id,
    id,
  };
  const response = await AddressService.get(user, request);

  return c.json({
    data: response,
  });
});

addressController.put("/api/contact/:contact_id/addresses/:id", async (c) => {
  const user = c.get("user") as User;
  const contact_id = Number(c.req.param("contact_id"));
  const id = Number(c.req.param("id"));
  const request = (await c.req.json()) as UpdateAddressRequest;
  request.contact_id = contact_id;
  request.id = id;

  console.log(request);

  const response = await AddressService.update(user, request);

  return c.json({
    data: response,
  });
});

addressController.delete(
  "/api/contact/:contact_id/addresses/:id",
  async (c) => {
    const user = c.get("user") as User;
    const contact_id = Number(c.req.param("contact_id"));
    const id = Number(c.req.param("id"));
    const request: DeleteAddressRequest = {
      contact_id,
      id,
    };

    const response = await AddressService.delete(user, request);

    return c.json({
      data: response,
    });
  }
);

addressController.get("/api/contact/:contact_id/addresses", async (c) => {
  const user = c.get("user") as User;
  const contact_id = Number(c.req.param("contact_id"));
  const request: ListAddressRequest = {
    contact_id,
  };

  const response = await AddressService.list(user, request);

  return c.json({
    data: response,
  });
});
