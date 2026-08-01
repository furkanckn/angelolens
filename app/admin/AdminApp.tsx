"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CMS_SECTIONS,
  IMAGE_KEYS,
  IMAGE_LABELS,
  flattenStrings,
  type ImageKey,
  type SiteImages,
} from "@/lib/cms-shared";
import { locales, type Locale } from "@/i18n/routing";

type Tab = "texts" | "images";

export function AdminApp({ initiallyAuthed }: { initiallyAuthed: boolean }) {
  const [authed, setAuthed] = useState(initiallyAuthed);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("texts");
  const [status, setStatus] = useState<{ kind: "ok" | "err" | ""; text: string }>({
    kind: "",
    text: "",
  });
  const [locale, setLocale] = useState<Locale>("tr");
  const [section, setSection] = useState<string>(CMS_SECTIONS[0].id);
  const [fields, setFields] = useState<{ path: string; value: string }[]>([]);
  const [images, setImages] = useState<SiteImages | null>(null);
  const [busy, setBusy] = useState(false);

  const flash = useCallback((kind: "ok" | "err", text: string) => {
    setStatus({ kind, text });
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!res.ok) {
      flash("err", "Şifre hatalı.");
      return;
    }
    setAuthed(true);
    flash("ok", "Giriş yapıldı.");
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  };

  const loadSection = useCallback(async () => {
    setBusy(true);
    const res = await fetch(
      `/api/admin/messages?locale=${locale}&section=${section}`,
    );
    setBusy(false);
    if (!res.ok) {
      flash("err", "Metinler yüklenemedi.");
      return;
    }
    const json = (await res.json()) as { data: unknown };
    setFields(flattenStrings(json.data));
  }, [locale, section, flash]);

  const loadImages = useCallback(async () => {
    setBusy(true);
    const res = await fetch("/api/admin/images");
    setBusy(false);
    if (!res.ok) {
      flash("err", "Görseller yüklenemedi.");
      return;
    }
    setImages((await res.json()) as SiteImages);
  }, [flash]);

  useEffect(() => {
    if (!authed) return;
    if (tab === "texts") void loadSection();
    if (tab === "images") void loadImages();
  }, [authed, tab, loadSection, loadImages]);

  const saveTexts = async () => {
    setBusy(true);
    const updates: Record<string, string> = {};
    for (const f of fields) updates[f.path] = f.value;
    const res = await fetch("/api/admin/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, section, updates }),
    });
    setBusy(false);
    flash(res.ok ? "ok" : "err", res.ok ? "Metinler kaydedildi." : "Kayıt başarısız.");
  };

  const uploadImage = async (key: ImageKey, file: File) => {
    setBusy(true);
    const fd = new FormData();
    fd.set("key", key);
    fd.set("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setBusy(false);
    if (!res.ok) {
      flash("err", "Yükleme başarısız.");
      return;
    }
    const json = (await res.json()) as { path: string };
    setImages((prev) => (prev ? { ...prev, [key]: json.path } : prev));
    flash("ok", `${IMAGE_LABELS[key]} güncellendi.`);
  };

  const sectionLabel = useMemo(
    () => CMS_SECTIONS.find((s) => s.id === section)?.label ?? section,
    [section],
  );

  if (!authed) {
    return (
      <div className="admin-shell">
        <form className="admin-login" onSubmit={login}>
          <h1>Angelo Lens Panel</h1>
          <p className="admin-status">Yazı ve görselleri buradan düzenleyebilirsiniz.</p>
          <div className="admin-field" style={{ marginTop: 16 }}>
            <label htmlFor="password">Şifre</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button className="admin-btn primary" type="submit" disabled={busy}>
            Giriş
          </button>
          {status.text ? (
            <p className={`admin-status ${status.kind}`}>{status.text}</p>
          ) : null}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <h1>Angelo Lens Panel</h1>
        <div className="admin-tabs">
          <button
            type="button"
            className={tab === "texts" ? "active" : ""}
            onClick={() => setTab("texts")}
          >
            Yazılar
          </button>
          <button
            type="button"
            className={tab === "images" ? "active" : ""}
            onClick={() => setTab("images")}
          >
            Görseller
          </button>
          <button type="button" className="admin-btn" onClick={logout}>
            Çıkış
          </button>
        </div>
      </header>

      {status.text ? (
        <p className={`admin-status ${status.kind}`}>{status.text}</p>
      ) : null}

      {tab === "texts" ? (
        <div className="admin-card">
          <div className="admin-row">
            <div className="admin-field" style={{ marginBottom: 0 }}>
              <label htmlFor="locale">Dil</label>
              <select
                id="locale"
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
              >
                {locales.map((l) => (
                  <option key={l} value={l}>
                    {l.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-field" style={{ marginBottom: 0, minWidth: 220 }}>
              <label htmlFor="section">Bölüm</label>
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                {CMS_SECTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="admin-btn primary"
              onClick={saveTexts}
              disabled={busy}
              style={{ alignSelf: "end" }}
            >
              Kaydet — {sectionLabel}
            </button>
          </div>

          {fields.length === 0 ? (
            <p className="admin-status">Bu bölümde düzenlenecek alan yok.</p>
          ) : (
            fields.map((f) => (
              <div className="admin-field" key={f.path}>
                <label htmlFor={f.path}>{f.path}</label>
                {f.value.length > 90 || f.value.includes("\n") ? (
                  <textarea
                    id={f.path}
                    value={f.value}
                    onChange={(e) =>
                      setFields((prev) =>
                        prev.map((x) =>
                          x.path === f.path ? { ...x, value: e.target.value } : x,
                        ),
                      )
                    }
                  />
                ) : (
                  <input
                    id={f.path}
                    value={f.value}
                    onChange={(e) =>
                      setFields((prev) =>
                        prev.map((x) =>
                          x.path === f.path ? { ...x, value: e.target.value } : x,
                        ),
                      )
                    }
                  />
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="admin-grid images">
          {IMAGE_KEYS.map((key) => (
            <div className="admin-card" key={key}>
              <h2>{IMAGE_LABELS[key]}</h2>
              <div className="admin-preview">
                {images?.[key] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={images[key]} alt={IMAGE_LABELS[key]} />
                ) : null}
              </div>
              <p className="admin-status" style={{ marginBottom: 8 }}>
                {images?.[key]}
              </p>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={busy}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void uploadImage(key, file);
                  e.target.value = "";
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
