-- last_change
CREATE FUNCTION finance_goal_update_last_change()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL AS
$$
BEGIN
    NEW.last_change = NOW()::timestamp;
    RETURN NEW;
END
$$;

CREATE TRIGGER refresh_last_change
BEFORE UPDATE ON finance_goal
FOR EACH ROW
EXECUTE PROCEDURE finance_goal_update_last_change();

-- created_on
CREATE FUNCTION finance_goal_init_created_on()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL AS
$$
BEGIN
    NEW.created_on = NOW()::timestamp;
    RETURN NEW;
END
$$;

CREATE TRIGGER init_created_on
BEFORE INSERT ON finance_goal
FOR EACH ROW
EXECUTE PROCEDURE finance_goal_init_created_on();