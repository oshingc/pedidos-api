import { OrderRepository } from "../../src/repositories/orderRepository";
import { Order } from "../../src/models/order";
import { Database } from "../../src/interfaces/database";

let mockDatabase: jest.Mocked<Database<Order>>;
let orderRepository: OrderRepository<Order>;

beforeEach(() => {
    mockDatabase = {
        find: jest.fn(),
        connect: jest.fn(),
        disconnect: jest.fn(),
        insert: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    } as jest.Mocked<Database<Order>>;
    orderRepository = new OrderRepository(mockDatabase);
});

test("test creating an order", async () => {

    const newOrder = new Order(1,1,1);
    mockDatabase.find.mockResolvedValue([newOrder]);

    const orders = await orderRepository.getAll();
    expect(orders).toEqual([newOrder]);
})

test('test find an order', () => {
});