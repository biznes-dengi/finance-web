-- last_change
CREATE FUNCTION update_last_change()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL AS
$$
BEGIN
    NEW.last_change = NOW()::timestamp;
    RETURN NEW;
END
$$;

CREATE TRIGGER finance_goal_refresh_last_change
BEFORE UPDATE ON finance_goal
FOR EACH ROW
EXECUTE PROCEDURE update_last_change();

-- created_on
CREATE FUNCTION init_created_on()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL AS
$$
BEGIN
    NEW.created_on = NOW()::timestamp;
    RETURN NEW;
END
$$;

CREATE TRIGGER finance_goal_init_created_on
BEFORE INSERT ON finance_goal
FOR EACH ROW
EXECUTE PROCEDURE init_created_on();