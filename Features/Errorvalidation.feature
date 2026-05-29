@Validation

Feature:Error validation
Scenario Outline: Verify error message for invalid login
    Given The user login to the second application with "<username>" and "<password>"
    Then verify the error message is displayed for invalid login

    Examples:
        | username                | password        |
        | dummyemail7@example.com | Dummy@123       |
        | rahulshettyacademy      | Learning@830$3m |

       
