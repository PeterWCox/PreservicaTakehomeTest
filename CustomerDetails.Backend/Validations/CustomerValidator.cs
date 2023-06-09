using FluentValidation;

public class CustomerValidator : AbstractValidator<Customer>
{
    public CustomerValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        //Name
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Invalid fullname format");

        //Email
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("Invalid email format");

        //PhoneNumber
        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .WithMessage("Invalid phone number format");

        //ProfilePhoto
        RuleFor(x => x.ProfilePhoto)
            .NotEmpty()
            .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _)).When(x => !string.IsNullOrEmpty(x.ProfilePhoto))
            .WithMessage("Invalid profile photo format");
    }
}