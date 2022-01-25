package com.dana.my_expenses.controller;

import com.dana.my_expenses.entity.Expense;
import com.dana.my_expenses.entity.User;
import com.dana.my_expenses.service.ExpenseService;
import com.dana.my_expenses.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/v1")
public class MainController {
    private ExpenseService expenseService;
    private UserService userService;

    @Autowired
    public MainController(ExpenseService expenseService, UserService userService) {
        this.expenseService = expenseService;
        this.userService = userService;
    }

    @PostMapping("/expenses")
    public String saveExpense(@RequestBody Expense expense) throws ExecutionException, InterruptedException {
        return expenseService.saveExpense(expense);
    }
    @GetMapping("/expenses/{id}")
    public Expense getExpense(@PathVariable String id) throws ExecutionException, InterruptedException {
        return expenseService.getExpense(id);
    }
    @GetMapping("/expenses")
    public Map<String, List<Expense>> getExpense() throws ExecutionException, InterruptedException {
        return expenseService.getExpenses();
    }
    @GetMapping("/expenses/filtered/{owner}")
    public Map<String, List<Expense>> getExpensesByOwner(@PathVariable String owner) throws ExecutionException, InterruptedException {
        return expenseService.getExpensesByOwner(owner);
    }
    @PutMapping("/expenses")
    public String updateExpense(@RequestBody Expense expense) throws ExecutionException, InterruptedException {
        return expenseService.updateExpense(expense);
    }
    @DeleteMapping("/expenses/{id}")
    public String deleteExpense(@PathVariable String id) throws ExecutionException, InterruptedException {
        return expenseService.deleteExpense(id);
    }

    @PostMapping("/users")
    public String addUser(@RequestBody User user) throws ExecutionException, InterruptedException {
        return userService.saveUser(user);
    }
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable String id) throws ExecutionException, InterruptedException {
        return userService.getUser(id);
    }


}
