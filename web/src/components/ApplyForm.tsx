import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { apply } from "../content";
import { ROLES, validate, type Application, type FieldErrors, type RequestKind } from "../lib/validation";
import { Lines } from "./Lines";

type Status = "idle" | "submitting" | "success";

/** API origin, overridable at build time (VITE_API_BASE) when the server is hosted apart from the site. */
const API_BASE: string = import.meta.env.VITE_API_BASE ?? "/api";

const EMPTY: Application = {
  kind: "",
  firstName: "",
  lastName: "",
  email: "",
  team: "",
  role: "",
  note: "",
  amount: "",
  keyRef: "",
  consent: false,
};

const FIELD_ORDER: (keyof Application)[] = [
  "kind",
  "firstName",
  "lastName",
  "email",
  "team",
  "role",
  "note",
  "amount",
  "keyRef",
  "consent",
];

function trimmed(values: Application): Application {
  return {
    ...values,
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    team: values.team.trim(),
    note: values.note.trim(),
    amount: values.amount.trim(),
    keyRef: values.keyRef.trim(),
  };
}

export function ApplyForm() {
  const [values, setValues] = useState<Application>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (next: Application) => {
    setValues(next);
    if (attempted) setErrors(validate(trimmed(next)));
  };

  const onText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    update({ ...values, [e.target.name]: e.target.value });
  };

  const focusFirstError = (errs: FieldErrors) => {
    const field = FIELD_ORDER.find((key) => errs[key]);
    if (!field) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${field}"]`);
    el?.focus();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    setFormError(null);

    const payload = trimmed(values);
    const clientErrors = validate(payload);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      focusFirstError(clientErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
        error?: string;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      setStatus("idle");
      if (data.errors) {
        setErrors(data.errors);
        focusFirstError(data.errors);
      } else {
        setFormError(data.error ?? apply.networkError);
      }
    } catch {
      setStatus("idle");
      setFormError(apply.networkError);
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setAttempted(false);
    setFormError(null);
    setStatus("idle");
  };

  const errorProps = (field: keyof Application) => ({
    "data-field": field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const errorText = (field: keyof Application) =>
    errors[field] ? (
      <span className="field__error" id={`${field}-error`}>
        {errors[field]}
      </span>
    ) : null;

  const f = apply.fields;
  const kind = values.kind;

  return (
    <section className="section apply" id="apply" aria-labelledby="apply-title">
      <div className="glow glow--apply" aria-hidden="true" />
      <Lines id="apply-title" className="display apply__title" lines={apply.title} accent />
      <p className="apply__body" data-reveal>
        {apply.body}
      </p>

      <div className="form-wrap" data-reveal>
        {status === "success" ? (
          <div className="form-success" role="status">
            <h3 className="serif-md">{apply.successTitle}</h3>
            <p>{apply.successBody}</p>
            <button type="button" className="pill-btn pill-btn--ghost" onClick={reset}>
              {apply.again}
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate>
            <fieldset className="field" aria-describedby={errors.kind ? "kind-error" : undefined}>
              <legend className="field__label">{f.kind}</legend>
              <div className="checks">
                {(["apply", "credit"] as RequestKind[]).map((option, i) => (
                  <label key={option} className="check">
                    <input
                      type="radio"
                      name="kind"
                      value={option}
                      checked={kind === option}
                      onChange={onText}
                      data-field={i === 0 ? "kind" : undefined}
                      aria-invalid={errors.kind ? true : undefined}
                    />
                    <span>{option === "apply" ? f.apply : f.credit}</span>
                  </label>
                ))}
              </div>
              {errorText("kind")}
            </fieldset>

            <label className="field">
              <span className="field__label">{f.firstName}</span>
              <input name="firstName" autoComplete="given-name" value={values.firstName} onChange={onText} {...errorProps("firstName")} />
              {errorText("firstName")}
            </label>
            <label className="field">
              <span className="field__label">{f.lastName}</span>
              <input name="lastName" autoComplete="family-name" value={values.lastName} onChange={onText} {...errorProps("lastName")} />
              {errorText("lastName")}
            </label>

            <label className="field">
              <span className="field__label">{f.email}</span>
              <input
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={f.emailPlaceholder}
                value={values.email}
                onChange={onText}
                {...errorProps("email")}
              />
              {errorText("email")}
            </label>

            <label className="field">
              <span className="field__label">{f.team}</span>
              <input name="team" autoComplete="organization-title" value={values.team} onChange={onText} {...errorProps("team")} />
              {errorText("team")}
            </label>

            <label className="field">
              <span className="field__label">{f.role}</span>
              <select name="role" value={values.role} onChange={onText} {...errorProps("role")}>
                <option value="" disabled>
                  {f.rolePlaceholder}
                </option>
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errorText("role")}
            </label>

            {kind === "apply" && (
              <label className="field">
                <span className="field__label">{f.note}</span>
                <textarea name="note" rows={3} maxLength={500} value={values.note} onChange={onText} {...errorProps("note")} />
                {errorText("note")}
              </label>
            )}

            {kind === "credit" && (
              <>
                <label className="field">
                  <span className="field__label">{f.amount}</span>
                  <input
                    name="amount"
                    value={values.amount}
                    onChange={onText}
                    placeholder={f.amountPlaceholder}
                    {...errorProps("amount")}
                  />
                  {errorText("amount")}
                </label>
                <label className="field">
                  <span className="field__label">{f.keyRef}</span>
                  <input
                    name="keyRef"
                    value={values.keyRef}
                    onChange={onText}
                    placeholder={f.keyPlaceholder}
                    {...errorProps("keyRef")}
                  />
                  {errorText("keyRef")}
                </label>
              </>
            )}

            <label className="check check--consent">
              <input
                type="checkbox"
                checked={values.consent}
                onChange={(e) => update({ ...values, consent: e.target.checked })}
                {...errorProps("consent")}
              />
              <span>{f.consent}</span>
            </label>
            {errorText("consent")}

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            <button type="submit" className="pill-btn" disabled={status === "submitting"}>
              {status === "submitting" ? apply.submitting : apply.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
