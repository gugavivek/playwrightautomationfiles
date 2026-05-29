@E2E-commerce 
Feature: E-commerce order placement
Scenario: Place an Order in an E-commerce Website
    Given The user login to the application with "username" and "password"
    When the user searches and add product to the cart
    Then verify the product is added and displayed in the cart
    When Enter valid payment details and place the order
    Then verify the placed orderid is present in the order history page
