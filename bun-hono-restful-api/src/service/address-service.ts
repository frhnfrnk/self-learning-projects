import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  DeleteAddressRequest,
  GetAddressRequest,
  ListAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { HTTPException } from "hono/http-exception";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    request = AddressValidation.CREATE.parse(request);

    await ContactService.contactMustExist(user, request.contact_id);

    const address = await prismaClient.address.create({
      data: request,
    });

    return toAddressResponse(address);
  }

  static async addressMustExist(
    contact_id: number,
    address_id: number
  ): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        id: address_id,
        contact_id: contact_id,
      },
    });

    if (!address) {
      throw new HTTPException(404, {
        message: "Address not found",
      });
    }

    return address;
  }

  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddressResponse> {
    request = AddressValidation.GET.parse(request);

    await ContactService.contactMustExist(user, request.contact_id);

    const address = await this.addressMustExist(request.contact_id, request.id);

    return toAddressResponse(address);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    request = AddressValidation.UPDATE.parse(request);

    await ContactService.contactMustExist(user, request.contact_id);

    await this.addressMustExist(request.contact_id, request.id);

    const updatedAddress = await prismaClient.address.update({
      where: {
        id: request.id,
        contact_id: request.contact_id,
      },
      data: request,
    });

    return toAddressResponse(updatedAddress);
  }

  static async delete(
    user: User,
    request: DeleteAddressRequest
  ): Promise<boolean> {
    request = AddressValidation.DELETE.parse(request);
    await ContactService.contactMustExist(user, request.contact_id);
    await this.addressMustExist(request.contact_id, request.id);

    await prismaClient.address.delete({
      where: {
        id: request.id,
        contact_id: request.contact_id,
      },
    });

    return true;
  }

  static async list(
    user: User,
    request: ListAddressRequest
  ): Promise<Array<AddressResponse>> {
    request = AddressValidation.LIST.parse(request);
    await ContactService.contactMustExist(user, request.contact_id);

    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: request.contact_id,
      },
    });

    return addresses.map((address) => toAddressResponse(address));
  }
}
