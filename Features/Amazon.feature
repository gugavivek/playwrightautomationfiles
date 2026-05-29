@Amazon
Feature: Amazon cart workflow
  Scenario: Login to Amazon, search RX BAR 10 count, add Chocolate Sea Salt 10 count pack, and increase cart quantity to 2
    Given The user login to Amazon with "your-email@example.com" and "yourpassword"
    When the user searches for "RX BAR 10 count"
    And the user adds the "Chocolate Sea Salt 10 count" pack to the cart
    And the user goes to cart and increases the quantity to 2
    Then verify the cart quantity is 2
