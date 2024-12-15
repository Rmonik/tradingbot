import { Container } from "inversify";
import { UserRepository } from "./UserRepository.js";


export function registerUserServices(container: Container): void {
    container.bind(UserRepository).toSelf();
}