package com.example.userapi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan")
public class LoanController {

    private static final Logger logger = LoggerFactory.getLogger(LoanController.class);

    @PostMapping("/calculate")
    public ResponseEntity<?> calculateLoan(@RequestBody LoanCalculationRequest request) {
        try {
            logger.info("Calculating loan for amount: {}, term: {}, creditScore: {}",
                    request.getLoanAmount(), request.getLoanTerm(), request.getCreditScore());

            // Validate inputs
            if (request.getLoanAmount() < 2500 || request.getLoanAmount() > 40000) {
                throw new IllegalArgumentException("Loan amount must be between $2,500 and $40,000");
            }
            if (request.getLoanTerm() < 36 || request.getLoanTerm() > 84 || request.getLoanTerm() % 12 != 0) {
                throw new IllegalArgumentException("Loan term must be 36, 48, 60, 72, or 84 months");
            }
            if (request.getCreditScore() < 600 || request.getCreditScore() > 850) {
                throw new IllegalArgumentException("Credit score must be between 600 and 850");
            }

            // Determine APR based on credit score (simplified)
            double apr;
            if (request.getCreditScore() >= 720) {
                apr = 7.99; // Excellent credit
            } else if (request.getCreditScore() >= 660) {
                apr = 12.99; // Good credit
            } else {
                apr = 24.99; // Fair credit
            }

            // Calculate monthly payment using the loan amortization formula
            double monthlyRate = apr / 100 / 12;
            int numberOfPayments = request.getLoanTerm();
            double monthlyPayment = request.getLoanAmount() * monthlyRate *
                    Math.pow(1 + monthlyRate, numberOfPayments) /
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

            // Calculate total interest
            double totalInterest = (monthlyPayment * numberOfPayments) - request.getLoanAmount();

            LoanCalculationResponse response = new LoanCalculationResponse();
            response.setMonthlyPayment(monthlyPayment);
            response.setApr(apr);
            response.setTotalInterest(totalInterest);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error calculating loan: {}", e.getMessage());
            return ResponseEntity.status(400).body("Calculation failed: " + e.getMessage());
        }
    }

    @PostMapping("/debt-consolidation")
    public ResponseEntity<?> calculateDebtConsolidation(@RequestBody DebtConsolidationRequest request) {
        try {
            logger.info("Calculating debt consolidation for creditScore: {}, debts: {}",
                    request.getCreditScore(), request.getDebts().size());

            // Validate inputs
            if (request.getCreditScore() < 600 || request.getCreditScore() > 850) {
                throw new IllegalArgumentException("Credit score must be between 600 and 850");
            }
            double totalBalance = request.getDebts().stream().mapToDouble(Debt::getBalance).sum();
            if (totalBalance > 40000) {
                throw new IllegalArgumentException("Total debt balance cannot exceed $40,000");
            }
            if (request.getDebts().isEmpty()) {
                throw new IllegalArgumentException("At least one debt is required");
            }
            for (Debt debt : request.getDebts()) {
                if (debt.getBalance() <= 0 || debt.getInterestRate() < 0 || debt.getMonthlyPayment() <= 0) {
                    throw new IllegalArgumentException("Invalid debt details: balance, interest rate, and monthly payment must be positive");
                }
            }

            // Determine APR based on credit score
            double apr;
            if (request.getCreditScore() >= 720) {
                apr = 7.99; // Excellent credit
            } else if (request.getCreditScore() >= 660) {
                apr = 12.99; // Good credit
            } else {
                apr = 24.99; // Fair credit
            }

            // Calculate current payoff time and total interest
            double currentTotalInterest = 0;
            int maxPayoffTime = 0;
            for (Debt debt : request.getDebts()) {
                double balance = debt.getBalance();
                double monthlyRate = debt.getInterestRate() / 100 / 12;
                double monthlyPayment = debt.getMonthlyPayment();
                int months = 0;
                double totalInterest = 0;
                while (balance > 0 && months < 1200) { // Cap at 100 years to prevent infinite loops
                    double interest = balance * monthlyRate;
                    double principalPayment = monthlyPayment - interest;
                    if (principalPayment <= 0) {
                        throw new IllegalArgumentException("Monthly payment too low for debt with balance $" + debt.getBalance());
                    }
                    balance -= principalPayment;
                    totalInterest += interest;
                    months++;
                }
                currentTotalInterest += totalInterest;
                maxPayoffTime = Math.max(maxPayoffTime, months);
            }

            // Calculate consolidated loan
            double monthlyRate = apr / 100 / 12;
            int loanTerm = 60; // Default to 60 months for consolidation
            double monthlyPayment = totalBalance * monthlyRate *
                    Math.pow(1 + monthlyRate, loanTerm) /
                    (Math.pow(1 + monthlyRate, loanTerm) - 1);
            double consolidatedTotalInterest = (monthlyPayment * loanTerm) - totalBalance;

            DebtConsolidationResponse response = new DebtConsolidationResponse();
            response.setCurrentPayoffTime(maxPayoffTime);
            response.setCurrentTotalInterest(currentTotalInterest);
            response.setConsolidatedPayoffTime(loanTerm);
            response.setConsolidatedTotalInterest(consolidatedTotalInterest);
            response.setEstimatedSavings(currentTotalInterest - consolidatedTotalInterest);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error calculating debt consolidation: {}", e.getMessage());
            return ResponseEntity.status(400).body("Calculation failed: " + e.getMessage());
        }
    }
}

class LoanCalculationRequest {
    private int loanAmount;
    private int loanTerm;
    private int creditScore;

    public int getLoanAmount() { return loanAmount; }
    public void setLoanAmount(int loanAmount) { this.loanAmount = loanAmount; }
    public int getLoanTerm() { return loanTerm; }
    public void setLoanTerm(int loanTerm) { this.loanTerm = loanTerm; }
    public int getCreditScore() { return creditScore; }
    public void setCreditScore(int creditScore) { this.creditScore = creditScore; }
}

class LoanCalculationResponse {
    private double monthlyPayment;
    private double apr;
    private double totalInterest;

    public double getMonthlyPayment() { return monthlyPayment; }
    public void setMonthlyPayment(double monthlyPayment) { this.monthlyPayment = monthlyPayment; }
    public double getApr() { return apr; }
    public void setApr(double apr) { this.apr = apr; }
    public double getTotalInterest() { return totalInterest; }
    public void setTotalInterest(double totalInterest) { this.totalInterest = totalInterest; }
}

class DebtConsolidationRequest {
    private int creditScore;
    private List<Debt> debts;

    public int getCreditScore() { return creditScore; }
    public void setCreditScore(int creditScore) { this.creditScore = creditScore; }
    public List<Debt> getDebts() { return debts; }
    public void setDebts(List<Debt> debts) { this.debts = debts; }
}

class Debt {
    private double balance;
    private double interestRate;
    private double monthlyPayment;

    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
    public double getInterestRate() { return interestRate; }
    public void setInterestRate(double interestRate) { this.interestRate = interestRate; }
    public double getMonthlyPayment() { return monthlyPayment; }
    public void setMonthlyPayment(double monthlyPayment) { this.monthlyPayment = monthlyPayment; }
}

class DebtConsolidationResponse {
    private int currentPayoffTime;
    private double currentTotalInterest;
    private int consolidatedPayoffTime;
    private double consolidatedTotalInterest;
    private double estimatedSavings;

    public int getCurrentPayoffTime() { return currentPayoffTime; }
    public void setCurrentPayoffTime(int currentPayoffTime) { this.currentPayoffTime = currentPayoffTime; }
    public double getCurrentTotalInterest() { return currentTotalInterest; }
    public void setCurrentTotalInterest(double currentTotalInterest) { this.currentTotalInterest = currentTotalInterest; }
    public int getConsolidatedPayoffTime() { return consolidatedPayoffTime; }
    public void setConsolidatedPayoffTime(int consolidatedPayoffTime) { this.consolidatedPayoffTime = consolidatedPayoffTime; }
    public double getConsolidatedTotalInterest() { return consolidatedTotalInterest; }
    public void setConsolidatedTotalInterest(double consolidatedTotalInterest) { this.consolidatedTotalInterest = consolidatedTotalInterest; }
    public double getEstimatedSavings() { return estimatedSavings; }
    public void setEstimatedSavings(double estimatedSavings) { this.estimatedSavings = estimatedSavings; }
}