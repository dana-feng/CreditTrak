package com.dana.my_expenses.service;

import com.dana.my_expenses.entity.Expense;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class ExpenseService {
    private static final String EXPENSES = "expenses";

    public String saveExpense(Expense expense) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(EXPENSES).document(expense.getId()).set(expense);
        return collectionApiFuture.get().getUpdateTime().toString();

    }

    public Expense getExpense(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(EXPENSES).document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        Expense expense = null;
        if (document.exists()) {
            expense = document.toObject(Expense.class);
            return expense;
        } else {
            return null;
        }
    }

    public String updateExpense(Expense expense) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(EXPENSES).document(expense.getId()).set(expense);
        return collectionApiFuture.get().getUpdateTime().toString();

    }

    public String deleteExpense(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(EXPENSES).document(id).delete();
        return "Document with Expense id" + id + "has been deleted successfully";

    }

    public Map<String, List<Expense>> getExpenses() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        Iterable<DocumentReference> documentReference = dbFirestore.collection(EXPENSES).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();
        Map<String, List<Expense>> expenses = new HashMap<>();

        while (iterator.hasNext()) {
            DocumentReference documentReference1 = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference1.get();
            DocumentSnapshot document = future.get();
            Expense expense = document.toObject(Expense.class);
            String credit = expense.getCard();
            List<Expense> temp = expenses.get(credit);
            if (expenses.get(credit) == null) {
                temp = new ArrayList<>();
            }
            temp.add(expense);
            expenses.put(credit, temp);
        }
        return expenses;


    }
    public Map<String, List<Expense>> getExpensesByOwner(String owner) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        Iterable<DocumentReference> documentReference = dbFirestore.collection(EXPENSES).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();
        Map<String, List<Expense>> expenses = new HashMap<>();

        while (iterator.hasNext()) {
            DocumentReference documentReference1 = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference1.get();
            DocumentSnapshot document = future.get();
            Expense expense = document.toObject(Expense.class);
            if (expense == null) {
                return expenses;
            }
            String credit = expense.getCard();
            List<Expense> temp = expenses.get(credit);
            if (expenses.get(credit) == null) {
                temp = new ArrayList<>();
            }
            if (expense.getOwner().equals(owner)) {
                temp.add(expense);
                expenses.put(credit, temp);
            }
        }
        return expenses;


    }
}
