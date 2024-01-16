package com.maksyank.finance.financegoal.boundary;

import com.maksyank.finance.financegoal.domain.request.PreparedFinanceGoal;
import com.maksyank.finance.financegoal.service.FinanceGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("financeGoal")
public class FinanceGoalController extends BaseController {

    private final FinanceGoalService financeGoalService;

    @Autowired
    FinanceGoalController(FinanceGoalService financeGoalService) {
        this.financeGoalService = financeGoalService;
    }

    // TO DO status must be enum
    @GetMapping()
    public void getByStatus(@RequestParam("status") String status) {
        this.financeGoalService.findByStatus(status);
    }

    @GetMapping("/{id}")
    public void getById(@PathVariable("id") int id) {
        this.financeGoalService.findById(id);
    }

    @PostMapping()
    public void create(@RequestBody PreparedFinanceGoal preparedFinanceGoal) {
        this.financeGoalService.create(preparedFinanceGoal);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable("id") int id, @RequestBody PreparedFinanceGoal preparedFinanceGoal) {
        this.financeGoalService.update(id, preparedFinanceGoal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        this.financeGoalService.delete(id);
    }
}
