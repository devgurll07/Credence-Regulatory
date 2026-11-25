import { services } from "./services";
import { catalogServices } from "./catalog";

export const allServices = [...services, ...catalogServices];

