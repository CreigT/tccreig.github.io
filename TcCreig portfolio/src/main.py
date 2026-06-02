def is_prime(number):
    # Check for numbers less than 2
    if number < 2:
        return False

    # Check for factors from 2 to the square root of the number
    for i in range(2, int(number**0.5) + 1):
        if number % i == 0:
            return False
    return True

if __name__ == "__main__":
    while True:
        print("Prime Number Checker")
        number = input("Enter a number: ")

        try:
            num = int(number)
        except ValueError:
            print("Invalid input. Please enter a valid integer.")
            continue

        if is_prime(num):
            print(f"{num} is a prime number.")
        else:
            print(f"{num} is not a prime number.")

 


